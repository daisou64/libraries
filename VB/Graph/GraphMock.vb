Imports OxyPlot
Imports OxyPlot.Axes
Imports OxyPlot.Series

Public Class GraphMock

    Private testCase As IEnumerable(Of List(Of Decimal)) = IntTestCase()
    Private testCaseIterator As IEnumerator(Of List(Of Decimal)) = testCase.GetEnumerator()
    Private testCaseCount = testCase.count

    Public Sub New(datalist As List(Of Decimal), max As Double, min As Double, scale As Double)

        InitializeComponent()
        Dim lineSeries = CreateLineSeries(datalist)
        Dim axes = CreateAxes(max, min, scale)
        CreateModel(lineSeries, axes)
        Label_iterator_max.Text = testCaseCount

    End Sub

    Private Function CreateLineSeries(datalist As List(Of Decimal)) As LineSeries
        Dim line As New LineSeries With {.Title = "Line", .MarkerType = MarkerType.Circle}
        datalist _
            .Select(Function(x, index) New DataPoint(index, x)) _
            .ToList() _
            .ForEach(Sub(x) line.Points.Add(x))
        Return line
    End Function

    Private Function CreateAxes(max As Double, min As Double, majorScale As Double) As LinearAxis
        Dim axes = New LinearAxis With {
            .Maximum = max,
            .Minimum = min,
            .MajorStep = majorScale,
            .MinorStep = majorScale / GraphLogic.MinorNumberOfScale
        }
        Label_Max.Text = max
        Label_Min.Text = min
        Label_Scale.Text = majorScale
        Return axes
    End Function

    Private Sub CreateModel(lineSeries As LineSeries, axes As LinearAxis)
        Dim model As New PlotModel With {.Title = "chart"}
        model.Series.Add(lineSeries)
        model.Axes.Add(axes)
        PlotView1.Model = model
    End Sub

    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        Dim currentNumber = CInt(Label_iterator_current.Text) + 1
        If currentNumber = testCaseCount + 1 Then
            testCase = IntTestCase()
            testCaseIterator = testCase.GetEnumerator()
            Label_iterator_current.Text = 0
        End If

        testCaseIterator.MoveNext()
        Label_iterator_current.Text = CInt(Label_iterator_current.Text) + 1

        'logic1
        'Dim logic As GraphLogic.IGraphLogic = GraphLogic.UseLogic(testCaseIterator.Current)
        'Dim axes = CreateAxes(logic.GetMaxScale(), logic.GetMinScale(), logic.GetScale())

        'logic2
        Dim result = GraphLogic2.AdjustRangeWithMargin(testCaseIterator.Current)
        Dim axes = CreateAxes(result.Item1, result.Item2, result.Item3)
        Dim lineSeries = CreateLineSeries(testCaseIterator.Current)
        CreateModel(lineSeries, Axes)
    End Sub

    Public Shared Iterator Function IntTestCase() As IEnumerable(Of List(Of Decimal))
        Yield New List(Of Decimal) From {1, 10, 10, 101}
        Yield New List(Of Decimal) From {1, 10, 100, 1000}
        Yield New List(Of Decimal) From {0.001, 0.010, 0.100, 0.4000}
        Yield New List(Of Decimal) From {0.001, 0.0010, 0.00100, 0.0004000}
        Yield New List(Of Decimal) From {1.22222, 10.22222, 100.44444, 1000.44444}
        Yield New List(Of Decimal) From {1, 10, 100, 1000}
        Yield New List(Of Decimal) From {-123, 0, 100, 235}
        Yield New List(Of Decimal) From {1, 10, 100, 1000}
        Yield New List(Of Decimal) From {1, 10, 100, 1000}
        Yield New List(Of Decimal) From {1, 10, 100, 1000}
        'Yield New List(Of Decimal) From {0, 0, 0, 0}
        Yield New List(Of Decimal) From {1, 10, 100, 1200}
        Yield New List(Of Decimal) From {1, 10, 100, 1201}
        Yield New List(Of Decimal) From {1, 10, 100, 1199}
        Yield New List(Of Decimal) From {10, 11, 12, 13}
        Yield New List(Of Decimal) From {100, 101, 102, 103}
        Yield New List(Of Decimal) From {1000, 1001, 1002, 1003}
        Yield New List(Of Decimal) From {-1000, 1001, 1002, 1003}
        Yield New List(Of Decimal) From {-10000, 1001, 1002, 1003}
    End Function
End Class